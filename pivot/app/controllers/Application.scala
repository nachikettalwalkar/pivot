package controllers

import play.api._
import play.api.mvc._
import utilities.Conf
import play.api.libs.ws.WS
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.iteratee.{Concurrent, Enumeratee}
import org.elasticsearch.action.search.SearchResponse
import scala.util.{Success, Failure}
import services.elastic4s
import scala.concurrent._
import models.Tweet
import formats.json.Writes.{ tweetWrites }
import org.joda.time.format.ISODateTimeFormat
import org.joda.time.{DateTimeZone, DateTime}
import java.security.MessageDigest
//import formats.json.Reads.{ tweetReads }
import play.api.libs.json.{Json, JsValue}
import actors.TwitterStreamActor
import models.Matches
import play.api.libs.EventSource


object Application extends Controller with elastic4s {

  var elasticTweetURL = Conf.get("elastic.TweetURL")
  val PercolationQueryURL = Conf.get("elastic.PercolationQueryURL")

  val dtFormat = ISODateTimeFormat.dateTime()	

  def index = Action {
    Ok(views.html.index("Pivot - A Social data analyser"))
  }

  def search =  Action.async(parse.json) {
    req => WS.url(elasticTweetURL + "_search").post(req.body).map { res => Ok(res.body) }
  }

  /** Filtering Enumeratee applying containsAll function */
  def matchesFilter(qID: String) = Enumeratee.filter[Matches] { pm => pm.matches.contains(qID) }

  /** Enumeratee: TweetMatches to Tweet adapter */
  val matchesToJson: Enumeratee[Matches, JsValue] = Enumeratee.map[Matches] { pm => pm.json }

   /** Enumeratee for detecting disconnect of SSE stream */
  def connDeathWatch(req: Request[AnyContent], since: DateTime): Enumeratee[JsValue, JsValue] =
    Enumeratee.onIterateeDone { () => Ok("Ok")}


  def getFromElasticSearch(searchString: String) = Action{
      val something: Future[SearchResponse] = get(searchString)
        something onComplete {
          case Success(p) => println(p)
          case Failure(t) => println("An error has occured: " + t)
        }  
        Ok(Json.toJson("Ok"))
  }

  def tweetFeed(q: String) = Action.async { req => {

      val query = Json.obj("query" -> Json.obj("query_string" -> Json.obj("default_field" -> "text",
          "default_operator" -> "AND", "query" -> ("(" + q + ") AND lang:en"))), 
        "timestamp" -> dtFormat.print(new DateTime(DateTimeZone.UTC)))

      /** identify queries by hash, only store unique queries once */
      val md = MessageDigest.getInstance("SHA-256")
      val queryID = md.digest(q.getBytes).map("%02x".format(_)).mkString

      WS.url(PercolationQueryURL + queryID).put(query).map {
        res => Ok.feed(TwitterStreamActor.jsonTweetsOut     
          &> matchesFilter(queryID)  
          &> Concurrent.buffer(1000)
          &> matchesToJson
          &> connDeathWatch(req, new DateTime(DateTimeZone.UTC)  )
          &> EventSource()).as("text/event-stream")       
      }
    }
  }
}