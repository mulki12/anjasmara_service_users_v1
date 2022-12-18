pipeline {

  environment {
    registry = "mulki12/anjasmara_service_users_v1"
    registryCredential = 'mulki12'
    dockerImage = ''
  }

  agent any

  stages {

    stage('Checkout Source') {
      steps {
        git 'https://github.com/mulki12/anjasmara_service_users_v1.git'
      }
    }

    stage('Build image') {
      steps{
        script{
            dockerImage = docker.build registry + ":$BUILD_NUMBER"
         }
      }
    }

//    stage('Deploy our image') {
//      steps{
//        script {
//          docker.withRegistry( '', registryCredential ) {
//            dockerImage.push("latest")
//          }
//        }
//      }
//    }

    stage('Deploying App to Kubernetes') {
      steps {
        sh 'envsubst < anjasmara_service_users_v1/deploymentservice.yml'
      }
    }

  }

}
