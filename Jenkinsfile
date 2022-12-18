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

    stage('Pushing Image') {
      environment {
               registryCredential = 'dockerhublogin'
           }
      steps{
        script {
          docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
            dockerImage.push("latest")
          }
        }
      }
    }

    stage('Deploying App to Kubernetes') {
      steps {
        script {
          kubernetesDeploy(configs: "deploymentservice.yml", kubeconfigId: "config")
        }
      }
    }

  }

}
