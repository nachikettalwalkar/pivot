name := "pivot"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  jdbc,
  anorm,
  cache,
  "org.scalatest" % "scalatest_2.10" % "1.9.1" % "test",
  "com.typesafe.akka" %% "akka-testkit" % "2.2.1"
)     

play.Project.playScalaSettings
