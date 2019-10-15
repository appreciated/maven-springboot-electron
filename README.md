# Springboot + Electron + OpenJDK

This project can be used as a starting point to create your own Springboot application with electron using maven only.
It contains all the necessary configuration and some placeholder files to get you started.

# How to build
`mvn clean install -Pproduction`

The artifacts from the electron build will be put into:
* `target\electron\springboot-on-electron-darwin-x64`
* `target\electron\springboot-on-electron-win32-x64`

# Shipping OpenJDK
Since not all your users have a JVM available via the classpath a OpenJDK 8 will be packed into the electron builds

# Documentation
* [Configure electron Application](https://github.com/appreciated/maven-springboot-electron/tree/master/src/main/javascript)
* [Electron build Part1](https://github.com/appreciated/maven-springboot-electron/blob/master/pom.xml#L198-L259)
* [Electron build Part2](https://github.com/appreciated/maven-springboot-electron/blob/master/pom.xml#L333-L358)
* [Configure OpenJDK download](https://github.com/appreciated/maven-springboot-electron/blob/master/pom.xml#L260-L332)
* [Configure OpenJDK injection](https://github.com/appreciated/maven-springboot-electron/blob/master/pom.xml#L359-L397)
