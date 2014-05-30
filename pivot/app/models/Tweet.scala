package models

import org.elasticsearch.action.search.SearchResponse
import play.api.libs.json._
import formats.json._

case class Tweet(
  text: String,
  sentimentCount: Double
 )

object Tweet {
	def tweetJson(response: SearchResponse) = {
		//val resp : Tweet = Json.fromJson(response)
		//println(resp)
	}
}