# Springboot + Electron + OpenJDK

This project can be used as a starting point to create your own Springboot application with electron.
It contains all the necessary configuration and some placeholder files to get you started.

# How to build
`mvn clean install -Pproduction`

The artifacts from the electron build will be put into:
* `target\electron\springboot-on-electron-darwin-x64`
* `target\electron\springboot-on-electron-win32-x64`

# Shipping OpenJDK
Since not all your users have a JVM available via the classpath a OpenJDK 8 will be packed into the electron builds
