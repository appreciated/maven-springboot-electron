# Maven + Spring Boot + Electron (+ OpenJDK)  

This project is a starting point for wrapping any Java web app—like those using Spring Boot—inside Electron to create a native executable. It’s built entirely with Maven, and the repo comes with all the necessary configurations and some placeholders to help you get up and running quickly.  

The idea for this project was heavily inspired by [electron-java-app](https://github.com/jreznot/electron-java-app), but there are a few key differences:  

- The build process is Maven-only, with Node being used indirectly.  
- The Electron app includes an OpenJDK to run the Java web app.  

### Proof of Concept  

The main goal here was to test out a idea, to combine Electron, a bundled JDK, and a Java web app in a Jar because I enjoy tinkering. Before using this in production, you’ll definitely want to evaluate if it fits your needs.  

That said, there are some trade-offs. Electron is already resource-heavy, and adding both a JVM and an embedded web server on top of it makes it even more demanding. So, do you really need both a browser and OpenJDK just to run a Java web app as a desktop app? If sticking with Java is a must, options like Swing or JavaFX could be more efficient. But in some cases, this setup might still be useful—for example, as a temporary solution before moving to the cloud.  

A few ways to improve this concept:  
- Removing OpenJDK by using GraalVM native images.  
- Replacing Electron with [Tauri](https://github.com/tauri-apps/tauri) for a lighter setup.  
- Long-term, as Progressive Web Apps (PWAs) evolve, the need for a browser might disappear entirely.  

Right now, this project doesn’t include an updater, and logging has to be set up manually—definitely areas for future development.

## Branches
- `master` -> Java 17  
- `java-8` -> Java 8

## How to build
`mvn clean install -Pproduction`

The artifacts from the electron build will be put into:
* `target\electron\springboot-on-electron-darwin-x64`
* `target\electron\springboot-on-electron-win32-x64`
* `target\electron\springboot-on-electron-linux-x64`

When using macOS or Linux, `wine` is required to build `windows` (check the maven build for further information).

When using Windows, admin privileges are required to build `darwin` (check the maven build for further information).

## Shipping OpenJDK
Since not all your users have the right JVM available via classpath an OpenJDK 17 will be packed into the electron builds

## Documentation
* [Configure electron Application](https://github.com/appreciated/maven-springboot-electron/tree/master/src/main/javascript)
* [Configure the electron archs Part1](https://github.com/appreciated/maven-springboot-electron/blob/master/src/main/javascript/package.json)
* [Configure the electron archs Part2](https://github.com/appreciated/maven-springboot-electron/blob/master/pom.xml#L236-L257)

* [Electron build Part1](https://github.com/appreciated/maven-springboot-electron/blob/master/pom.xml#L198-L259)
* [Electron build Part2](https://github.com/appreciated/maven-springboot-electron/blob/master/pom.xml#L333-L358)
* [Configure OpenJDK download & injection](https://github.com/appreciated/maven-springboot-electron/blob/master/pom.xml#L260-L332)

## Build
When executing `mvn clean install -Pproduction` by default the `windows` (x64), `darwin` (x64) and `linux` (x64) will be built.

The rest is currently not supported but adding those shouldn't be too hard but some changes will need to be made at the following files:
* [Create 'scripts' for the other electron archs](https://github.com/appreciated/maven-springboot-electron/blob/master/src/main/javascript/package.json#L14-L17)
* [Add the new 'scripts' to the maven build](https://github.com/appreciated/maven-springboot-electron/blob/master/pom.xml#L236-L257)
* [Download the correct JDK](https://github.com/appreciated/maven-springboot-electron/blob/master/pom.xml#L265-L294)
* [Unpack the Downloaded JDK](https://github.com/appreciated/maven-springboot-electron/blob/master/pom.xml#L296-L332)
* [Inject downloaded JDK to the electron build](https://github.com/appreciated/maven-springboot-electron/blob/master/pom.xml#L359-L395)
* [Use correct JDK at runtime](https://github.com/appreciated/maven-springboot-electron/blob/master/src/main/javascript/main.js#L108-L139)


## Pull requests are welcome
