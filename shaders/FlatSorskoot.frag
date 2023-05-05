#include "lib/Compatibility.frag"

#define FEATURE_EMISSIVE_MAPPING
#define FEATURE_SORSKOOT

#define TEXTURED
#define ALPHA_MASKED

#define USE_TEXTURE_COORDS
#define USE_MATERIAL_ID

#ifdef EMISSIVE_MAPPING
#define USE_EMISSIVE_MAPPING
#endif

#include "lib/Inputs.frag"

#include "lib/Textures.frag"
#include "lib/Materials.frag"

struct Material {
    mediump uint flatTexture;
    #ifdef EMISSIVE_MAPPING
    mediump uint emissiveTexture;
    #endif
};

Material decodeMaterial(uint matIndex) {
    {{decoder}}
    return mat;
}

float gaussianValue(vec2 B, float k) {
    float Ax = exp(-k * pow(B.x, 2.0)) + exp(-k * pow(B.x - 1.0, 2.0));
    float Ay = exp(-k * pow(B.y, 2.0)) + exp(-k * pow(B.y - 1.0, 2.0));
    float A = Ax * Ay;
    return A;
}

float fogFactorExp2(float dist, float density) {
    const float LOG2 = -1.442695;
    float d = density * dist;
    return 1.0 - clamp(exp2(d*d*LOG2), 0.0, 1.0);
}

void main() {
    // float pixelSize = 16.0;
    // vec2 uv = (floor(fragTextureCoords*pixelSize)+0.5)/pixelSize;

    // // alphaMask(fragMaterialId, uv);
    // Material mat = decodeMaterial(fragMaterialId);
    // outColor = textureAtlas(mat.flatTexture, uv);

     float pixelSize = 16.0;
    vec2 uv = fragTextureCoords * pixelSize;

    // Calculate smoothstep factors for the x and y directions.
    vec2 f = fract(uv);
    float smoothFactorX = smoothstep(0.49, 0.51, f.x);
    float smoothFactorY = smoothstep(0.49, 0.51, f.y);

    // Find the four closest texture coordinates.
    vec2 topLeftUV = (floor(uv) + 0.5) / pixelSize;
    vec2 topRightUV = (floor(uv) + vec2(1.5, 0.5)) / pixelSize;
    vec2 bottomLeftUV = (floor(uv) + vec2(0.5, 1.5)) / pixelSize;
    vec2 bottomRightUV = (floor(uv) + vec2(1.5, 1.5)) / pixelSize;

    Material mat = decodeMaterial(fragMaterialId);

    // // Sample the four closest texels.
    // vec4 topLeftColor = textureAtlas(mat.flatTexture, topLeftUV);
    // vec4 topRightColor = textureAtlas(mat.flatTexture,topRightUV);
    // vec4 bottomLeftColor = textureAtlas(mat.flatTexture,bottomLeftUV);
    // vec4 bottomRightColor = textureAtlas(mat.flatTexture,bottomRightUV);

    // // Linearly interpolate between horizontal pairs using smoothFactorX.
    // vec4 topColorBlend = mix(topLeftColor,topRightColor,smoothFactorX);
    // vec4 bottomColorBlend=mix(bottomLeftColor,bottomRightColor,smoothFactorX);

    // //Linearly interpolate between vertical pairs using smoothFactorY
    // outColor=mix(topColorBlend,bottomColorBlend,smoothFactorY);
  
    vec4 emissiveAmount = vec4(0.0);
    #ifdef EMISSIVE_MAPPING
        emissiveAmount = textureAtlas(mat.emissiveTexture, topLeftUV);
    #endif

    vec4 pixelated = textureAtlas(mat.flatTexture, topLeftUV);
    vec4 original = textureAtlas(mat.flatTexture, clamp(fragTextureCoords, 1.0/32.0, 1.0-1.0/32.0));
    

    vec4 finalColor = mix(pixelated,original,gaussianValue(fragTextureCoords, 64.0));

    float dist = gl_FragCoord.z/gl_FragCoord.w;
    float fogFactor = fogFactorExp2(dist, 0.1);
    vec4 theColor = mix(finalColor, vec4(0.,0.,0.,1.), fogFactor);

    outColor = theColor; 
    outColor.rgb = mix(theColor.rgb,finalColor.rgb,emissiveAmount.r);
    outColor.a = finalColor.a; // Force alpha back in
}
