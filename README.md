# Knockaround

Experiments in quick proxying. Probably going to try Rust, Node, Elixir, Go, and AWS Lambda... Not in that order.

Experimental setup is pretty simple: a node 'application server' that gets requests proxied through an 'intermediate server' (the test unit) from a 'client server' (another node script). The Intermediate server is the important one where throughput is super important.

## Notes:

### Node
The intermediate node server is plenty quick (sub 10ms round trip times), but starts to go sideways at more than 1000 requests per second (roundtrips top 100ms).

### Go

### Elixir

### Rust

### License: MIT
