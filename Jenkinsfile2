pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    stage("Git Clone"){

        git credentialsId: 'GIT_HUB_CREDENTIALS', url: 'https://github.com/mulki12/anjasmara-service-users-v1.git', branch: 'master' 
    }

    stage("Build") {

       sh 'docker build . '
       sh 'docker image list'

    }

    withCredentials([string(credentialsId: 'DOCKER_HUB_PASSWORD', variable: 'PASSWORD')]) {
        sh 'docker login -u mulki12 -p $PASSWORD'
    }

    stage("Push Image to Docker Hub"){
        sh 'docker push mulki12/anjasmara-service-users-v1:latest'
    }

    stage("kubernetes deployment"){
        sh 'kubectl apply -f deployment.yml'
    }
}