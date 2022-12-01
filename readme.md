PASSO A PASSO PARA CRIAÇÃO DE AMBIENTE SEM ANDROID STUDIO E BUILD ANDROID/IOS

Link de requisitos para ambiente mobile sem android studio
- https://medium.com/@vitaoloureiro/react-native-sem-instalar-o-android-studio-dff6c028e03b

Instalar versão do java jdk-17.0.1 ou a mais recente

Instalar a versão o cli do react native
- npm install -g react-native-cli

Baixar a versão do android sdk (somente linha de comando), bem no final da página você encontra a opção “Obtenha apenas as ferramentas de linha de comando”.
- https://developer.android.com/studio/index.html
- Extrair o conteudo do zip para C:\Android\sdk dentro da pasta C:\Android\sdk\cmdline-tools\tools\bin

Link de instalação de emuladores usando avdmanager
- https://gist.github.com/mrk-han/66ac1a724456cadf1c93f4218c6060ae

Veja qual a ultima versão do android disponvivel
- sdkmanager --list | grep system-images

Baixe a ultima versão do android
- sdkmanager --install "system-images;android-30;aosp_atd;x86

Crie um novo dispositivo virtual
- echo no | avdmanager --verbose create avd --force --name my-emulator --package system-images;android-33;google_apis_playstore;x86_64 --abi "x86_64"

Para configurar o avd criado acima deve ser alterado o arquivo 
- C:/users/{{nome-usuario}}/.android/avd/my-emulator.avd/config.ini

Alterar estas linhas: 
- hw.lcd.height = 1024
- hw.lcd.width = 600
- hw.lcd.density = 480

Adicionar novas linhas:
- skin.name={{nome da skin desejada}}
- skin.path=C:\Android\sdk\platforms\android-31\skins\{{nome da pasta da skin scolhida}}

OBS: na raiz do projeto há um .zip com várias skins disponíveis;

Para executar o emulador entre em C:\Android\sdk\emulator
- emulator -avd my-emulator



senha da chave de teste de regação do build 123123

link do passo a passo para geração do build
https://reactnative.dev/docs/signed-apk-android



----- GUIA PASSO-A-PASSO PARA GERAÇÃO DO APK E DO AAB -----

Por padrão existe um APK na pasta "...\android\app\build\outputs\apk\debug" que é gerado para instalar o app no emulador durante o processo de desenvolvimento

---- Atualizar Gradle ----

1) confira a versão atual do seu gradle dentro da pasta ( Android )
./gradle --version
./gradlew --version

2) No site "gradle.org/releases" confira a versão mais atual e digite o comando
./gradlew wrapper --gradle-version 6.9.3 (ou a última versão disponível)

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
