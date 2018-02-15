pipeline {
    agent {
        docker { 
            image 'reimagined/resolve-ci' 
            args '-u root:root'
        }
    }
    stages {
        stage('Unit tests') {
            steps {
                script {
                    sh 'npm install'
                    sh 'npm run bootstrap'
                    sh 'npm run lint'
                    sh 'npm test -- --stream'
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'rm -rf ./*'
            }
            
            deleteDir()
        }
    }
}

// LINKS:

// https://github.com/DevExpress/XAF2/tree/devops/node-testcafe
// https://hub.docker.com/r/reimagined/node-testcafe/

// https://github.com/DevExpress/XAF2/tree/devops/next-lerna-version
