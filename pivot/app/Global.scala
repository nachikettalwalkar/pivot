import actors.TwitterStreamActor.{AddUser, Start, AddTopic}
import play.api.GlobalSettings
import actors.TwitterStreamActor
import utilities.Conf

object Global extends GlobalSettings {

  override def onStart(application: play.api.Application) {
  	println("Here .. on Start")
    Conf.get("application.topics").split(",").foreach(s => TwitterStreamActor.supervisor ! AddTopic(s))   
    Conf.get("application.users").split(",").foreach(u => TwitterStreamActor.supervisor ! AddUser(u))
    TwitterStreamActor.supervisor ! Start
  }

  override def onStop(application: play.api.Application) { TwitterStreamActor.system.shutdown() } 
}