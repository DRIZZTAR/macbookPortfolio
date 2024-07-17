import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Instance, Instances } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

function ExtrudedTriangle() {
	const shape = new THREE.Shape();
	shape.moveTo(0, 0);
	shape.lineTo(1, 0);
	shape.lineTo(0.5, Math.sqrt(3) / 2);
	shape.lineTo(0, 0);

	const extrudeSettings = {
		steps: 1,
		depth: 0.4,
		bevelEnabled: false,
	};

	return <extrudeGeometry args={[shape, extrudeSettings]} />;
}

function ReflectiveTriangles({ count = 5000, size = 1 }) {
	const ref = useRef();
	const { positions, scales, rotations, colors } = useMemo(() => {
		const positions = [...Array(count)].map((_, i) => {
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);
			const r = 50 + Math.random() * 50; // Distribute between radius 50 and 100
			return new THREE.Vector3(
				r * Math.sin(phi) * Math.cos(theta),
				r * Math.sin(phi) * Math.sin(theta),
				r * Math.cos(phi)
			);
		});

		const scales = [...Array(count)].map(() => (0.5 + Math.random() * 0.5) * size);
		const rotations = [...Array(count)].map(
			() =>
				new THREE.Euler(
					Math.random() * Math.PI,
					Math.random() * Math.PI,
					Math.random() * Math.PI
				)
		);

		const colorOptions = ['#000000', '#ffffff', '#888888', '#ff0000', '#ECFF60', '#1D9BF0'];
		const colors = [...Array(count)].map(() => {
			const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
			return new THREE.Color(randomColor);
		});

		return { positions, scales, rotations, colors };
	}, [count, size]);

	useFrame(state => {
		const time = state.clock.getElapsedTime();

		for (let i = 0; i < count; i++) {
			const position = positions[i];
			const scale = scales[i];
			const rotation = rotations[i];

			// Apply bobbing motion
			const y = position.y + Math.sin(time * scale) * 0.5;

			// Apply rotation over time
			rotation.x += 0.001 * scale;
			rotation.y += 0.002 * scale;
			rotation.z += 0.003 * scale;

			const matrix = new THREE.Matrix4()
				.makeRotationFromEuler(rotation)
				.setPosition(position.x, y, position.z)
				.scale(new THREE.Vector3(scale, scale, scale));

			ref.current.setMatrixAt(i, matrix);
		}
		ref.current.instanceMatrix.needsUpdate = true;
	});

	return (
		<Instances ref={ref} limit={count}>
			<ExtrudedTriangle />
			<meshStandardMaterial roughness={0} metalness={0.8} />
			{positions.map((pos, i) => (
				<Instance key={i} color={colors[i]} />
			))}
		</Instances>
	);
}

export default ReflectiveTriangles;
