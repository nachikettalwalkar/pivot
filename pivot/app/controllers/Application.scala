package controllers

import play.api._
import play.api.mvc._
import utilities.Conf
import play.api.libs.ws.WS
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.iteratee.{Concurrent, Enumeratee}

object Application extends Controller {

  var elasticTweetURL = Conf.get("elastic.TweetURL")	

  def index = Action {
    Ok(views.html.index("Pivot - A Social data analyser"))
  }

  def search =  Action.async(parse.json) {
    req => WS.url(elasticTweetURL + "_search").post(req.body).map { res => Ok(res.body) }
  }

}