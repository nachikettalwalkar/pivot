package formats.json

import play.api.libs.json._

import org.joda.time.{ DateTime, LocalDate, DateTimeZone }
import models.Tweet

object Writes {
  implicit object tweetWrites extends Writes[Tweet] {
    def writes(t: Tweet) = JsObject(Seq(
      "text" -> Json.toJson(t.text),
      "sentimentCount" -> Json.toJson(t.sentimentCount)
    ))
  }
}  