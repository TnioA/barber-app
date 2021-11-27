link de requisitos para ambiente mobile sem android studio

https://medium.com/@vitaoloureiro/react-native-sem-instalar-o-android-studio-dff6c028e03b

link de instalação de emuladores usando avdmanager
https://gist.github.com/mrk-han/66ac1a724456cadf1c93f4218c6060ae

instalar versão do java jdk-17.0.1

senha da chave de teste de regação do build 123123


link do passo a passo para geração do build
https://reactnative.dev/docs/signed-apk-android







----- GUIA PASSO-A-PASSO PARA GERAÇÃO DO APK E DO AAB -----

Por padrão existe um APK na pasta "...\android\app\build\outputs\apk\debug" que é gerado para instalar o app no emulador durante o processo de desenvolvimento

---- Atualizar Gradle ----

1) confira a versão atual do seu gradle
./gradle --version
./gradlew --version

2) No site "gradle.org/releases" confira a versão mais atual e digite o comando
./gradlew wrapper --gradle-version 6.7.1 (ou a última versão disponível)

3) Digite novamente o comando "./gradlew --version" para completar o download e verificar a versão atualizada

-------------------------

1 - Entre na pasta do aplicativo

2 - Rode os comandos abaixo para gerar os arquivo de keystore (chave). Uma linha de comando de cada vez

keytool -genkeypair -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

 2.1 - Será necessário inserir uma senha e mais algumas informações 6 digitos (123456).
 2.2 - Ao finalizar serão gerados os arquivos das chaves na pasta ao app (my-release-key.keystore  e  my-upload-key.keystore).

3 - Copie as chaves e cole na pasta app que fica dentro da pasta android do seu projeto
 {seuApp}\android\app

4 - Agora vamos configurar as váriaveis do Gradle
 4.1 - Na pasta android do seu projeto ( {seuApp}\android ) no arquivo gradle.properties insira os comandos a seguir:
 
 MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
 MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
 MYAPP_UPLOAD_STORE_PASSWORD=***Senha que vc digitou antes***
 MYAPP_UPLOAD_KEY_PASSWORD=***Senha que vc digitou antes***

5 - Na pasta ( {seuApp}\android\app ) no arquivo build.gradle insira os comandos dentro de android {signingConfigs}

 release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }

5.1 - (e dentro do buildTypes) insira o comando:
 release {
  signingConfig signingConfigs.release
 }

6 - Gerando o arquivo APK

 6.1 - No prompt digite o comando dentro da pasta ( Android ) do seu App digite:
  ./gradlew assembleRelease
 6.2 - Para gerar o AAB para publicar na google play digite o comando:
  ./gradlew bundleRelease

7 - O APK se encontrará na pasta
...\android\app\build\outputs\apk\release

8 - O AAB se encontrará na pasta
...\android\app\build\outputs\bundle\release