package models

import org.elasticsearch.action.search.SearchResponse
import play.api.libs.json._
import formats.json.Reads.tweetReads

case class Tweet(
  text: String,
  created_at: String
 )

object Tweet {

 def toList[a](array: Array[a]): List[a] = {
    def convert(arr: Array[a], aggregator: List[a]): List[a] = {
      if (arr == null || arr.length == 0) aggregator
      else convert(arr.slice(0, arr.length-1), arr(arr.length-1) :: aggregator)
    }
	convert(array, Nil)
  }

  def tweetWrites(list: List[JsValue]) = {
  	 val tweets: List[Tweet] = list.map {tw => tw.as[Tweet]}
  	 tweets
  }

  def formatData(response: SearchResponse) = {
      val searchHits = response.getHits().getHits()
      val responseInJson: Array[String] = searchHits.map { hit => hit.getSourceAsString() }
      val responseList: List[String] = toList(responseInJson)
      
      val json: List[JsValue] = responseList.map { res => Json.parse(res)}
      tweetWrites(json)
  }
}