package formats.json

import play.api.libs.json._
import play.api.data.validation.ValidationError

import org.joda.time.{ DateTime, LocalDate }
import models.Tweet


object Reads {
  /*implicit object coordReads extends Reads[Coord] {
    def reads(js: JsValue): JsResult[Coord] = {
      val arr = js.as[Seq[Double]]

      if (arr.size == 2) JsSuccess(Coord(arr(0), arr(1)))
      else JsError(__, ValidationError("not.2d.coord", arr.size))
    }
  }*/

  /*implicit object tweetReads extends Reads[Tweet] {
   def reads(json: JsValue) = JsSuccess(Tweet(
      "text" -> Json.fromJson(json.text),
      "source" -> Json.fromJson(json.source)
    ))
  }*/

}  