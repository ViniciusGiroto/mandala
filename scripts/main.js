"use strict";
let iterations = 1;

let diameter = 1;
let diameterFactor = 0.30;

let rotationSpeed = 0.1;
let rotation = 0;

let speedFactor = -1;

const vertices = [];
let vertexCount = 5;
let verticesInterval = 2;

function setup() {
  const { width } = main.getBoundingClientRect();
  const canvas = createCanvas(width, width);
  canvas.parent("main");
  canvas.class("d-block");

  update();

  stroke("#3F3F46");
}

function update() {
  [
    vertexCount,
    verticesInterval,
    iterations,
    rotationSpeed,
    speedFactor,
    diameterFactor,
  ] = [...paramsForm.elements].map((el) => el.valueAsNumber);

  const unit = createVector(1, 0);
  vertices.length = 0;

  for (let i = 0; i < vertexCount; i++) {
    vertices.push(p5.Vector.rotate(unit, i * TAU / vertexCount));
  }
}

function windowResized() {
  const { width } = main.getBoundingClientRect();
  resizeCanvas(width, width);
}

function draw() {
  const halfWidth = 0.5 * width;
  const halfWidthWithPadding = 0.5 * (width - 16);

  rotation += 1e-3 * deltaTime * rotationSpeed;

  clear();

  for (let n = 0; n < iterations; n++) {
    push();
    strokeWeight(
      2 / halfWidthWithPadding / (diameter * (diameterFactor ** n)),
    );
    translate(halfWidth, halfWidth);
    rotate(TAU * rotation * (speedFactor ** n));
    scale(diameter * halfWidthWithPadding * (diameterFactor ** n));

    for (let i = 0; i < vertexCount; i++) {
      const vertex = vertices[i];
      const nextVertex = vertices.at((i + verticesInterval) % vertexCount);

      line(vertex.x, vertex.y, nextVertex.x, nextVertex.y);
    }
    pop();
  }
}

paramsForm.addEventListener("change", update);
paramsForm.addEventListener("input", update);
