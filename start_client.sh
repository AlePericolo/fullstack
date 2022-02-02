#!/bin/bash
echo "start client.."
cd client/ && export API_ENDPOINT=http://localhost:3000 && npm run serve
