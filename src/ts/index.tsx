import * as Surplus from 'surplus';
import S from 's-js';
import { World, Engine, Bodies, Vector } from 'matter-js';

window.onload = () => {
  const app = document.getElementById('app');
  const engine = Engine.create({
    enableSleeping: true,
  });

  const world = engine.world;
  engine.world.bounds.min = Vector.create(0, 0);
  engine.world.bounds.max = Vector.create(100, 100);

  const ball = Bodies.circle(50, 50, 5, {
    restitution: .5,
  });
  const floor = Bodies.rectangle(50, 95, 100, 10, { isStatic: true });

  World.add(world, ball);
  World.add(world, floor);
  S.root(() => {
    const cx = S.value(0);
    const cy = S.value(0);

    const render = () => {
      return <svg width="100%" height="100%" viewBox="0 0 100 100">
        <circle cx={cx()} cy={cy()} r={5} fill="red"/>
        <rect x={floor.position.x - 50} y={floor.position.y - 5} width={100} height={10} fill="red"/>
      </svg>;
    };
    app.appendChild(render());

    let then = 0;
    const f = (now: number) => {
      const diff = now - then;
      if (diff > 0) {
        Engine.update(engine, diff, 0);
      }
      cx(ball.position.x);
      cy(ball.position.y);
      then = now;
      requestAnimationFrame(f);
    }
    f(0);
  });
};