import http from 'k6/http'
import { check, sleep } from 'k6'
import { htmlReport } from './bundle.js'
import uuid from './uuid.js'

// Teste de performace
// Parametros de execução
// 10 vus por 10 segundos
//cadastrar 10 usuários por segundo
//duração de requisição de 500ms
//taxa de erro de 1%
//taxa de sucesso de 95%



export function handleSummary(data) {
    return {
        'index.html': htmlReport(data),
    }
}

export const options = {
    vus:10,
    duration: '10s',
    
}

export default function () {
    const url = 'http://test-api.k6.io'

    const payload = JSON.stringify(
        {
            username: uuid.v4().substring(24),
            first_name: uuid.v4().substring(24),
            last_name: uuid.v4().substring(24),
            email: `${uuid.v4().substring(24)}@qa.estima.com.br`,
            password: `123456`,
        })
    
    const headers = {
        'headers': {
            'Content-Type': 'application/json'
        }
    }

    let res = http.post(url, payload, headers)
    check(res, {
        'is status 201': (r) => r.status === 201
    })
    sleep(1)
}