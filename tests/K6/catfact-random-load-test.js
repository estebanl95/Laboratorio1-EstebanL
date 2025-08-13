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
    http_req_duration: ['p(95)<400'], // 95% of requests should be below 400ms
    http_req_failed: ['rate<0.02'],   // Error rate should be below 2%
    checks: ['rate>0.98'],            // 98% of checks should pass
  },
};

export default function() {
  const url = 'https://catfact.ninja/fact';
  
  const params = {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'k6-load-test/1.0',
    },
  };
  
  const response = http.get(url, params);
  
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 400ms': (r) => r.timings.duration < 400,
    'has fact field': (r) => r.json().hasOwnProperty('fact'),
    'has length field': (r) => r.json().hasOwnProperty('length'),
    'fact is not empty': (r) => r.json().fact.length > 0,
    'fact length matches': (r) => r.json().fact.length === r.json().length,
  });
  
  if (response.status === 200) {
    const data = response.json();
    console.log(`Cat fact (${data.length} chars): ${data.fact}`);
  }
  
  sleep(0.5 + Math.random() * 1.5); // Random sleep between 0.5-2 seconds
}
