const fs = require('fs');
const chalk = require('chalk');

setImmediate(scanAndFixDependenciesGradle);

function scanAndFixDependenciesGradle() {
  console.log(chalk.blue('#########################################'));
  console.log(chalk.blue('# Fix Android dependencies build.gradle #'));
  console.log(chalk.blue('#########################################\n'));

  if (!fs.existsSync('./node_modules')) {
    console.log(chalk.red('node_modules directory does not exists, run npm install first'));
    return;
  }

  // removeUsageOfNonExistingFirebaseStorageApi();
  unifyFirebaseVersions();
  // unifyFastImageVersions();
  // unifySvgVersions();
  replaceDeprecatedGradleKeywords();

  console.log(chalk.green.bold('Finish android react native fixes'));
}

const unifyFirebaseVersions = () => {
  let gradleFile = `./node_modules/react-native-firebase/android/build.gradle`;
  fs.writeFileSync(gradleFile, fixedReactNativeFirebaseGradleFile);
};
const unifyFastImageVersions = () => {
  let gradleFile = `./node_modules/react-native-fast-image/android/build.gradle`;
  fs.writeFileSync(gradleFile, fixedReactNativeFastImageGradle);
};
const unifySvgVersions = () => {
  let gradleFile = `./node_modules/react-native-svg/android/build.gradle`;
  fs.writeFileSync(gradleFile, fixedReactNativeSvg);
};

const removeUsageOfNonExistingFirebaseStorageApi = () => {
  const RNFirebaseStorageFile = `./node_modules/react-native-firebase/android/src/main/java/io/invertase/firebase/storage/RNFirebaseStorage.java`;
  let firebaseRNFirebaseStorageContent = fs.readFileSync(RNFirebaseStorageFile).toString();
  firebaseRNFirebaseStorageContent = firebaseRNFirebaseStorageContent.split('List<Uri> _downloadURLS = storageMetadata.getDownloadUrls();').join('List<Uri> _downloadURLS = null;');
  firebaseRNFirebaseStorageContent = firebaseRNFirebaseStorageContent
    .split('resp.putString("downloadURL", taskSnapshot.getDownloadUrl() != null ? taskSnapshot.getDownloadUrl().toString() : null);')
    .join('resp.putString("downloadURL", null);');
  fs.writeFileSync(RNFirebaseStorageFile, firebaseRNFirebaseStorageContent);
  console.log(chalk.green.bold('Processed file: ') + chalk.black.italic(RNFirebaseStorageFile));
};

const replaceDeprecatedGradleKeywords = () => {
  function replaceKeyword(content) {
    content = content.split(/compile\s/).join('implementation ');
    content = content.split('compile("').join('implementation("');
    content = content.split(/androidTestCompile\s/).join('androidTestImplementation ');
    content = content.split(/testCompile\s/).join('testImplementation ');
    content = content.split(/debugCompile\s/).join('debugImplementation ');
    content = content.split(/testApi\s/).join('testImplementation ');
    content = content.split(/provided\s/).join('compileOnly ');
    return content;
  }
  console.log(chalk.blue('################################'));
  console.log(chalk.blue('# Upgrade Android build.gradle #'));
  console.log(chalk.blue('################################\n'));
  const nodeModulePath = './node_modules';
  if (!fs.existsSync(nodeModulePath)) {
    console.log(chalk.red('node_modules directory does not exists'));
    return;
  }
  const dirs = fs.readdirSync(nodeModulePath);
  const subDirs = [`./android/app/build.gradle`];

  const checkAndPush = dir => fs.existsSync(dir) && subDirs.push(dir);
  dirs.forEach(dir => {
    const lookupDirs = ['android/build.gradle', 'ReactAndroid/build.gradle', 'src/android/build.gradle', 'lib/android/build.gradle', 'android/app/build.gradle'];
    lookupDirs.forEach(lookupDir => checkAndPush(`${nodeModulePath}/${dir}/${lookupDir}`));
  });
  subDirs.forEach(gradle => {
    const content = fs.readFileSync(gradle).toString();
    const replacedContent = content
      .replace(/compile(?=[\s\t\n\(])/g, 'implementation')
      .replace(/(androidTest|test|debug)(?:Api|Compile)(?=[\s\t\n])/g, '$1Implementation')
      .replace(/provided(?=[\s\t\n])/g, 'compileOnly');

    if (content.length !== replacedContent.length) {
      fs.writeFileSync(gradle, replacedContent);
      console.log(chalk.green.bold('Processed file: ') + chalk.black.italic(gradle));
    }
  });
};

const fixedReactNativeFirebaseGradleFile = `
buildscript {
  repositories {
    jcenter()
    google()
    maven {
      url 'https://maven.fabric.io/public'
    }
  }
  dependencies {
    classpath 'com.android.tools.build:gradle:3.2.0-alpha14'
    classpath 'io.fabric.tools:gradle:1.25.4'
  }
}

apply plugin: 'com.android.library'

def DEFAULT_COMPILE_SDK_VERSION = 27
def DEFAULT_BUILD_TOOLS_VERSION = "27.0.3"
def DEFAULT_TARGET_SDK_VERSION = 26
def DEFAULT_SUPPORT_LIB_VERSION = "27.1.1"

android {
  compileSdkVersion rootProject.hasProperty('compileSdkVersion') ? rootProject.compileSdkVersion : DEFAULT_COMPILE_SDK_VERSION
  buildToolsVersion rootProject.hasProperty('buildToolsVersion') ? rootProject.buildToolsVersion : DEFAULT_BUILD_TOOLS_VERSION
  defaultConfig {
    minSdkVersion 16
    targetSdkVersion rootProject.hasProperty('targetSdkVersion') ? rootProject.targetSdkVersion : DEFAULT_TARGET_SDK_VERSION
    versionCode 1
    versionName "1.0"
    multiDexEnabled true
  }
  buildTypes {
    release {
      minifyEnabled false
    }
  }
  productFlavors { }
}


allprojects {
  repositories {
    jcenter()
    mavenLocal()
    google()
  }
}

rootProject.gradle.buildFinished { buildResult ->
  if (buildResult.getFailure() != null) {
    try {
      String message = buildResult.getFailure().properties.get("reportableCauses").toString()
      if (message.contains("com.android.dex.DexException: Multiple dex files define Lcom/google/") ||
      message.contains("java.util.zip.ZipException: duplicate entry: com/google/android/gms/")) {
        logger.log(LogLevel.ERROR, "")
        logger.log(LogLevel.ERROR, " -----------------------------------------------------------")
        logger.log(LogLevel.ERROR, "|                    REACT NATIVE FIREBASE                  |")
        logger.log(LogLevel.ERROR, " ----------------------------------------------------------- ")
        logger.log(LogLevel.ERROR, "|                                                           |")
        logger.log(LogLevel.ERROR, "|  This is a common build error when using libraries that   |")
        logger.log(LogLevel.ERROR, "|  require google play services.                            |")
        logger.log(LogLevel.ERROR, "|                                                           |")
        logger.log(LogLevel.ERROR, "|  This error occurs because different versions of google   |")
        logger.log(LogLevel.ERROR, "|  play services or google play services modules are being  |")
        logger.log(LogLevel.ERROR, "|  required by different libraries.                         |")
        logger.log(LogLevel.ERROR, "|                                                           |")
        logger.log(LogLevel.ERROR, "|  A temporary fix would be to set:                         |")
        logger.log(LogLevel.ERROR, "|                                                           |")
        logger.log(LogLevel.ERROR, "|             android { multiDexEnabled true }              |")
        logger.log(LogLevel.ERROR, "|                                                           |")
        logger.log(LogLevel.ERROR, "|  inside your build gradle, however it is recommended for  |")
        logger.log(LogLevel.ERROR, "|  your prod build that you de-duplicate these to minimize  |")
        logger.log(LogLevel.ERROR, "|  bundle size.                                             |")
        logger.log(LogLevel.ERROR, "|                                                           |")
        logger.log(LogLevel.ERROR, "|  See http://invertase.link/dupe-dex for how to do this.   |")
        logger.log(LogLevel.ERROR, "|                                                           |")
        logger.log(LogLevel.ERROR, " ----------------------------------------------------------- ")
      }
    } catch (Exception exception) {}
  }
}

def supportVersion = rootProject.hasProperty('supportLibVersion') ? rootProject.supportLibVersion : DEFAULT_SUPPORT_LIB_VERSION

dependencies {
  // compile fileTree(include: ['*.jar'], dir: 'libs')
  api "com.facebook.react:react-native:+"  // From node_modules
  api "com.android.support:support-v4:$supportVersion"
  compileOnly('com.crashlytics.sdk.android:crashlytics:2.9.1@aar') {
    transitive = true
  }
  compileOnly 'com.google.firebase:firebase-appindexing:15.0.1'
  compileOnly 'com.google.firebase:firebase-auth:16.0.1'
  compileOnly "com.google.firebase:firebase-ads:15.0.1"
  compileOnly 'com.google.firebase:firebase-config:16.0.0'
  compileOnly 'com.google.firebase:firebase-core:16.0.0'
  compileOnly 'com.google.firebase:firebase-crash:16.0.0'
  compileOnly 'com.google.firebase:firebase-database:16.0.1'
  compileOnly 'com.google.firebase:firebase-firestore:17.0.1'
  compileOnly 'com.google.firebase:firebase-invites:16.0.0'
  compileOnly 'com.google.firebase:firebase-storage:16.0.1'
  compileOnly 'com.google.firebase:firebase-messaging:17.0.0'
  compileOnly 'com.google.firebase:firebase-perf:16.0.0'
  compileOnly 'com.google.firebase:firebase-functions:16.0.1'
  compileOnly 'me.leolin:ShortcutBadger:1.1.21@aar'
}
`;

const fixedReactNativeFastImageGradle = `
buildscript {
    repositories {
        jcenter()
        google()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.1.3'
    }
}

apply plugin: 'com.android.library'

def _ext = rootProject.ext

def _reactNativeVersion = _ext.has('reactNative') ? _ext.reactNative : '+'
def _compileSdkVersion = _ext.has('compileSdkVersion') ? _ext.compileSdkVersion : 23
def _buildToolsVersion = _ext.has('buildToolsVersion') ? _ext.buildToolsVersion : '23.0.1'
def _minSdkVersion = _ext.has('minSdkVersion') ? _ext.minSdkVersion : 16
def _targetSdkVersion = _ext.has('targetSdkVersion') ? _ext.targetSdkVersion : 22
def _glideVersion = _ext.has('glideVersion') ? _ext.glideVersion : '4.7.1'
def _excludeAppGlideModule = _ext.has('excludeAppGlideModule') ? _ext.excludeAppGlideModule : false

android {
    compileSdkVersion _compileSdkVersion
    buildToolsVersion _buildToolsVersion

    sourceSets {
        main {
            java {
                if (_excludeAppGlideModule) {
                    srcDir 'src'
                    exclude '**/FastImageGlideModule.java'
                }
            }
        }
    }

    defaultConfig {
        minSdkVersion _minSdkVersion
        targetSdkVersion _targetSdkVersion
        versionCode 1
        versionName "1.0"
    }
    lintOptions {
        abortOnError false
    }
}

repositories {
    mavenCentral()
    google()
}

dependencies {
    //noinspection GradleDynamicVersion
    implementation "com.facebook.react:react-native:\${_reactNativeVersion}"
    implementation "com.android.support:support-v4:\${_compileSdkVersion}"
    implementation("com.github.bumptech.glide:glide:\${_glideVersion}") {
        exclude group: "com.android.support"
    }
    implementation("com.github.bumptech.glide:annotations:\${_glideVersion}") {
        exclude group: "com.android.support"
    }
    annotationProcessor "com.github.bumptech.glide:compiler:\${_glideVersion}"
    implementation("com.github.bumptech.glide:okhttp3-integration:\${_glideVersion}") {
        exclude group: "com.android.support"
        exclude group: 'glide-parent'
    }
}
`;

const fixedReactNativeSvg = `
buildscript {
    repositories {
        jcenter()
        google()
    }

    dependencies {
        //noinspection GradleDependency
        classpath 'com.android.tools.build:gradle:3.1.3'
    }
}

apply plugin: 'com.android.library'

def DEFAULT_COMPILE_SDK_VERSION = 27
def DEFAULT_BUILD_TOOLS_VERSION = "27.0.3"
def DEFAULT_TARGET_SDK_VERSION = 26
def DEFAULT_SUPPORT_LIB_VERSION = "27.1.1"

android {
    compileSdkVersion rootProject.hasProperty('compileSdkVersion') ? rootProject.compileSdkVersion : DEFAULT_COMPILE_SDK_VERSION
    //noinspection GradleDependency
    buildToolsVersion rootProject.hasProperty('buildToolsVersion') ? rootProject.buildToolsVersion : DEFAULT_BUILD_TOOLS_VERSION

    defaultConfig {
        minSdkVersion 16
        //noinspection OldTargetApi
        targetSdkVersion rootProject.hasProperty('targetSdkVersion') ? rootProject.targetSdkVersion : DEFAULT_TARGET_SDK_VERSION
        versionCode 1
        versionName "1.0"
    }
    lintOptions {
        abortOnError false
    }
}

repositories {
    mavenLocal()
    jcenter()
    google()
    maven {
        // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
        url "$projectDir/../../../node_modules/react-native/android"
    }
}

dependencies {
    //noinspection GradleDynamicVersion
    implementation 'com.facebook.react:react-native:+'
}
`;
