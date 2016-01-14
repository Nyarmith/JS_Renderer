// VECTOR DEFINITION
/**
 * algo_handler root namespace.
 *
 * @nameSpace algo_handler
 */
if (typeof vec2 == "undefined" || !vec2) {
    function vec2(){};
}

vec2.create = function() {
    var out = Array(2);
    out[0]=out[1]=0;
    return out;
}

vec2.dot = function(a, b) {
    return (a[0]*b[0]+a[1]*b[1]);
}

vec2.scale = function(a,s){
    var out = Array(2);
    out[0] = a[0] * s;
    out[1] = a[1] * s;
    return out;
}

vec2.multiply = function(a,b){
    var out = Array(2);
    out[0] *= a[0] * b[0];
    out[1] *= a[1] * b[1];
    return out;
}

vec2.add = function(a,b){
    var out = Array(3);
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
}

vec2.subtract = function(a,b){
    var out = Array(2);
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
}

vec2.size = function(a){
    return (Math.sqrt(a[0]*a[0]+a[1]*a[1]));
}

vec2.normalize = function(a){
    var out = Array(2);
    var size = vec2.size(a);
    out[0] = a[0] / size;
    out[1] = a[1] / size;
    return out;
}
