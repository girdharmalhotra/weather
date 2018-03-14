/**
** Utility functions for getting the wind direction based on degree.
**/

const directionMap = {
  0: 'N',
  23: 'NNE',
  45: 'NE',
  78: 'ENE',
  90: 'E',
  113: 'ESE',
  135: 'SE',
  158: 'SSE',
  180: 'S',
  203: 'SSW',
  225: 'SW',
  248: 'WSW',
  270: 'W',
  293: 'WNW',
  315: 'NW',
  338: 'NNW',
  360: 'N'
}

export function windDirection(degree) {
  degree = +degree;

  if(degree > 360 || degree < 0) {
    return 'In Space';
  }
  // get all degree's from the directionMap keys
  let degreeSet = Object.keys(directionMap);

  // find the closest degree to map the directional representation.
  for( let i = 1; i < degreeSet.length; i++ ) {
    let leftBoundry = +degreeSet[i-1], rightBoundry = degreeSet[i];

    if(degree >= leftBoundry && degree <= rightBoundry) {
      let leftDegree = degree-leftBoundry, rightDegree = rightBoundry-degree;
      let minDiff = Math.min(leftDegree,rightDegree);

      return minDiff === leftDegree ? directionMap[leftBoundry] : directionMap[rightBoundry];
    }
  }

  return null;
}
