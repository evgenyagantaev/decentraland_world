import { engine, executeTask } from '@dcl/sdk/ecs'
import { TimeManager } from './TimeManager'
import { Vector3, Quaternion, Color3, Color4 } from '@dcl/sdk/math'
import { Transform, GltfContainer, TextShape, Entity, MeshRenderer, MeshCollider, Material } from '@dcl/sdk/ecs'

export function main() 
{
  // Accumulator for elapsed seconds
  let elapsed = 0
  const timeManager = new TimeManager()

  // Create the text entity once at startup
  const textEntity = engine.addEntity()
  Transform.create(textEntity, {
    // Set text position
    position: Vector3.create(5, 3, 5.7)
  })
  TextShape.create(textEntity, {
    text: "This world is\nunder construction",
    fontSize: 3,
    textColor : Color4.create (1, 0, 0, 1)
  })

  // Create the calendar stone entity once at startup
  const calendarStone = engine.addEntity()
  Transform.create(calendarStone, {
    position: Vector3.create(8, 2.5, 8),
    rotation: Quaternion.fromEulerDegrees(0, 0, 90),
    scale: Vector3.create(3.0, 1.5, 1.5)
  })
  GltfContainer.create(calendarStone, {
    src: "assets/asset-packs/ad_rock/Rock_03/Rock_03.glb",
  })

  // Create the cube entity once at startup
  spawnBlueCubeWithRedH(5, 3, 6)

  // System to update the text every minute with the current in-world time
  engine.addSystem((dt: number) => {
    elapsed += dt
    if (elapsed >= 60) {
      elapsed -= 60
      executeTask(async () => {
        // Retrieve and append the current system time to the text
        const timeString = await timeManager.processWorldTime()
        const textComponent = TextShape.getMutable(textEntity)
        textComponent.text = "This world is\nunder construction\n" + timeString
      })
    }
  })
}

/**
 * Spawns a blue cube with red "H" on each face.
 * The cube is created only once at startup.
 * @param x - X position of the cube.
 * @param y - Y position of the cube.
 * @param z - Z position of the cube.
 * @returns The cube entity.
 */
function spawnBlueCubeWithRedH(x: number, y: number, z: number): Entity {
  // Create the cube entity
  const cube = engine.addEntity()
  
  // Set cube transform component
  Transform.create(cube, {
    position: Vector3.create(x, y, z),
    rotation: Quaternion.fromEulerDegrees(0, 0, 0),
    scale: Vector3.create(4, 4, 0.3)
  })

  // Set mesh renderer and collider for the cube
  MeshRenderer.setBox(cube)
  MeshCollider.setBox(cube)

  // Apply a blue material to the cube
  Material.setPbrMaterial(cube, { albedoColor: Color4.fromHexString("#0000FF") })

  return cube
}
