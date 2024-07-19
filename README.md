## Maven + Springboot + Electron (+ OpenJDK)

This project is a starting point to wrap any Java web application (f.e. using Springboot) with Electron as a native executable. For the build process, only Maven is being used. This project contains all the necessary configurations and some placeholder files to get you started.

This project was inspired a lot by [electron-java-app](https://github.com/jreznot/electron-java-app), but it has some key differences: 
* Instead of Gradle only Maven is being used (of course also Node but indirectly)
* When building the Electron application an OpenJDK will be included to start the Java web application

## Proof of concept
The primary objective of this project was to explore the feasibility of a novel concept involving Electron, a shipped JDK, and a Java Web Application packaged as a Jar, purely out of personal interest. Before considering its implementation in a production environment, it is crucial to thoroughly assess your specific requirements.

As it stands, the project is not without its drawbacks. Electron inherently consumes significant client-side resources, and the inclusion of both an additional JVM and an embedded web server further exacerbates this issue. This raises the question: Is it necessary to use both a browser and OpenJDK to run a Java Web Application as a desktop application? If the application must remain in Java, alternatives such as Swing or JavaFX could be considered more resource-efficient. However, there are scenarios where this setup could prove beneficial, such as a transitional solution prior to cloud migration.

Potential enhancements to this concept could involve eliminating the OpenJDK by leveraging native images from GraalVM. Although completely removing the browser component is not currently feasible, significant improvements could be made by substituting Electron with [Tauri](https://github.com/tauri-apps/tauri). As Progressive Web Apps (PWAs) become more universally compatible and capable of running local applications, the necessity for a browser might diminish entirely. Presently, the project lacks updater functionality, and logging must be implemented manually, which are areas ripe for development.

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
