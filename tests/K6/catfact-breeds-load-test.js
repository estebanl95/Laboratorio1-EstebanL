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
    http_req_duration: ['p(90)<800'], // 90% of requests should be below 800ms
    http_req_failed: ['rate<0.05'],   // Error rate should be below 5%
  },
};

export default function() {
  const url = 'https://catfact.ninja/breeds';
  
  const params = {
    headers: {
      'Accept': 'application/json',
    },
  };
  
  const response = http.get(url, params);
  
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 800ms': (r) => r.timings.duration < 800,
    'has data field': (r) => r.json().hasOwnProperty('data'),
    'data is array': (r) => Array.isArray(r.json().data),
    'has pagination info': (r) => r.json().hasOwnProperty('current_page'),
  });
  
  if (response.status === 200) {
    const data = response.json();
    console.log(`Found ${data.data.length} cat breeds on page ${data.current_page}`);
    if (data.data.length > 0) {
      console.log(`First breed: ${data.data[0].breed}`);
    }
  }
  
  sleep(Math.random() * 2 + 1); // Random sleep between 1-3 seconds
}
