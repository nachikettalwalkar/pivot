package services

import com.sksamuel.elastic4s.ElasticClient
import com.sksamuel.elastic4s.ElasticDsl._
import scala.concurrent._
import org.elasticsearch.action.search.SearchResponse
import org.elasticsearch.common.settings.ImmutableSettings;

trait elastic4s {
  def get(searchString: String): Future[SearchResponse] = {
    val client = ElasticClient.remote("127.0.0.1", 9300)

    client execute { search in "pivot"->"tweets" query searchString}
  }
}