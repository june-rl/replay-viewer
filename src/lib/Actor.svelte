<script>
import { T } from '@threlte/core'
const scaleFactor = 500
</script>

<T.Mesh position={[0, 0, 0]}>
    <T.BoxGeometry args={[84.2/scaleFactor,56.27/scaleFactor,118.01/scaleFactor]}  />
    <T.MeshBasicMaterial />
</T.Mesh>