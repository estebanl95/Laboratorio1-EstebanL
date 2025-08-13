import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 5 },  // Stage 1: 5 users for 30s
    { duration: '30s', target: 10 }, // Stage 2: 10 users for 30s
    { duration: '30s', target: 20 }, // Stage 3: 20 users for 30s
    { duration: '30s', target: 30 }, // Stage 4: 30 users for 30s
    { duration: '30s', target: 40 }, // Stage 5: 40 users for 30s
    { duration: '30s', target: 50 }, // Stage 6: 50 users for 30s
    { duration: '30s', target: 0 },  // Ramp down to 0 users over 30s
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    http_req_failed: ['rate<0.1'],    // Error rate should be below 10%
  },
};

export default function() {
  const url = 'https://dog.ceo/api/breeds/image/random';
  
  const response = http.get(url);
  
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
    'has message field': (r) => r.json().hasOwnProperty('message'),
    'has status success': (r) => r.json().status === 'success',
    'message contains image URL': (r) => r.json().message.includes('https://'),
  });
  
  if (response.status === 200) {
    const data = response.json();
    console.log(`Random dog image: ${data.message}`);
  }
  
  sleep(1); // Wait 1 second between requests
}
