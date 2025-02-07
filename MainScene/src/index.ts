import { engine, executeTask } from '@dcl/sdk/ecs'
import { TimeManager } from './TimeManager'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { Transform, GltfContainer } from '@dcl/sdk/ecs'

export function main() {
  // Accumulator for elapsed seconds
  let elapsed = 0
  const timeManager = new TimeManager()

  engine.addSystem((dt: number) => {
    // Create a fresh new Entity
    let calendar_stone = engine.addEntity()

    // Add a Transform component with position, rotation, and scale
    Transform.create(calendar_stone, {
      position: Vector3.create(8, 2.5, 8),
      // Adding rotation: example rotates 45 degrees around the X-axis
      rotation: Quaternion.fromEulerDegrees(0, 0, 90),
      // Adding scaling: example scales 1.5 times in every direction
      scale: Vector3.create(3.0, 1.5, 1.5)
    })

    // Add a GltfContainer to attach the model
    GltfContainer.create(calendar_stone, {
      src: "assets/asset-packs/ad_rock/Rock_03/Rock_03.glb",
    })

    elapsed += dt
    if (elapsed >= 60) {
      elapsed -= 60
      // Execute task to process world time
      executeTask(async () => {
        await timeManager.processWorldTime()
      })
    }
  })
}
