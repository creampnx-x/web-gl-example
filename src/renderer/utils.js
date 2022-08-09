/**
 * `Math.sin/cos` use radians, but we use degrees. 
 * The function can caculate the sin/cos of degrees.
 * @param {number} degree
 * @returns sin(degree), cos(degree)
 */
export function getArc(degree) {
    const rad = degree * Math.PI / 180;
    return {
        sinB: Math.sin(rad),
        cosB: Math.cos(rad)
    };
}