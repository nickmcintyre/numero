class Bubble {
  // Create an array of p5.Vector's from keypoints
  static getKeypoints(pose) {
    const keypoints = [];
    for (let j = 0; j < pose.keypoints.length; j += 1) {
      const keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
        const { x, y } = keypoint.position;
        keypoints.push(createVector(x, y));
      }
    }

    return keypoints;
  }

  // Subtract each p5.Vector coordinates from width, height
  // then divide by gridSize.
  static scaleKeypoints(fluid, keypoints) {
    const scaled = [];
    const bigV = createVector(width, height);
    keypoints.forEach((kp) => {
      const skp = p5.Vector.sub(bigV, kp).div(fluid.params.gridSize);
      scaled.push(skp);
    });
    return scaled;
  }

  // Generate the convex hull for the set of keypoints.
  static convexHull(keypoints, lower, upper) {
    keypoints.sort((a, b) => (
      a.x === b.x ? a.y - b.y : a.x - b.x
    ));

    for (let i = 0; i < keypoints.length; i += 1) {
      while (lower.length >= 2) {
        const v1 = p5.Vector.sub(lower[lower.length - 2], keypoints[i]);
        const v2 = p5.Vector.sub(lower[lower.length - 1], keypoints[i]);
        if (p5.Vector.cross(v1, v2).z <= 0) {
          lower.pop();
        } else {
          break;
        }
      }

      lower.push(keypoints[i]);
    }

    for (let i = keypoints.length - 1; i >= 0; i -= 1) {
      while (upper.length >= 2) {
        const v1 = p5.Vector.sub(upper[upper.length - 2], keypoints[i]);
        const v2 = p5.Vector.sub(upper[upper.length - 1], keypoints[i]);
        if (p5.Vector.cross(v1, v2).z <= 0) {
          upper.pop();
        } else {
          break;
        }
      }

      upper.push(keypoints[i]);
    }

    upper.pop();
    lower.pop();

    return lower.concat(upper);
  }

  // Decrease search area by finding the bounding rectangle around the
  // convex hull.
  static findEdges(hull) {
    const edges = {
      left: {
        x: width,
        y: 0,
      },
      right: {
        x: 0,
        y: 0,
      },
      lower: {
        x: 0,
        y: height,
      },
      upper: {
        x: 0,
        y: 0,
      },
    };

    for (let i = 0; i < hull.length; i += 1) {
      edges.left = edges.left.x > hull[i].x ? hull[i] : edges.left;
      edges.right = edges.right.x < hull[i].x ? hull[i] : edges.right;
      edges.lower = edges.lower.y > hull[i].y ? hull[i] : edges.lower;
      edges.upper = edges.upper.y < hull[i].y ? hull[i] : edges.upper;
    }

    return edges;
  }

  // Place convex hull (1) in bounding box (0).
  // TODO: this seems broken
  static fillHull(edges, lower, upper) {
    const m = floor(edges.upper.y - edges.lower.y);
    const n = floor(edges.right.x - edges.left.x);
    let result = [[]];
    if (m > 0 && n > 0) {
      result = new Array(m);
      for (let i = 0; i < m; i += 1) {
        result[i] = new Array(n);
        const x = edges.left.x + i;
        for (let j = 0; j < n; j += 1) {
          const y = edges.lower.y + j;
          let interior = true;

          // For the lower hull, check to see that each test point is > y.
          for (let k = 1; k < lower.length; k += 1) {
            const f = linear(lower[k], lower[k - 1]);
            if (y < f(x)) {
              interior = false;
            }
          }

          // For the upper hull, check to see that each test point is < y.
          for (let k = 1; k < upper.length; k += 1) {
            const f = linear(upper[k], upper[k - 1]);
            if (y > f(x)) {
              interior = false;
            }
          }

          if (interior) {
            result[i][j] = 1;
          } else {
            result[i][j] = 0;
          }
        }
      }
    }

    return result;
  }

  // Add hull and bounding box as barriers.
  static addHull(fluid, bbox, edges) {
    const { m, n } = fluid.params;

    const bm = bbox.length;
    const bn = bm > 0 ? bbox[0].length : 0;

    if (bm > 0 && bn > 0) {
      const right = floor(n - edges.right.x);
      const left = floor(n - right - bn);

      const top = floor(m - edges.upper.y);
      const bottom = floor(m - top - bm);
      const bubble = createTensor(bbox);
      fluid.state.bar = Fluid.fragment(bubble.pad([[top, bottom], [left, right]]));
    }
  }

  // Outline poses (people) moving in a fluid.
  static envelop(poses, fluid) {
    // Assign to barrier.
    for (let i = 0; i < poses.length; i += 1) {
      const { pose } = poses[i];
      let keypoints = Bubble.getKeypoints(pose);
      const lower = [];
      const upper = [];
      keypoints = Bubble.scaleKeypoints(fluid, keypoints);
      const hull = Bubble.convexHull(keypoints, lower, upper);
      const edges = Bubble.findEdges(hull);
      const bbox = Bubble.fillHull(edges, lower, upper);
      Bubble.addHull(fluid, bbox, edges);
    }
  }
}

// Compute parameters for a linear function between two points.
function linear(p0, p1) {
  const dy = p1.y - p0.y;
  const dx = p1.x - p0.x === 0 ? 0.00000001 : p1.x - p0.x; // TODO: Fix this
  const m = dy / dx;
  const b = p1.y - m * p1.x;

  return (x) => m * x + b;
}
