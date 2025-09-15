import { motion } from "framer-motion";
export default function App() {
  return (
    <main style={{maxWidth:960,margin:"0 auto",padding:"2rem"}}>
      <motion.h1 initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.5}}>
        Hi, I’m Alberto
      </motion.h1>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.2,duration:.5}}>
        Test1.
      </motion.p>

      <section style={{marginTop:"2rem"}}>
        <h2>Projects</h2>
        <div style={{display:"grid",gap:"1rem",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))"}}>
          {[
            {name:"Project One", url:"https://github.com/Albertdmo13/PROJECT-1"},
            {name:"Project Two", url:"https://github.com/Albertdmo13/PROJECT-2"},
          ].map(p => (
            <motion.a key={p.name} href={p.url} whileHover={{scale:1.02}} whileTap={{scale:.98}}
              style={{border:"1px solid #222",borderRadius:12,padding:"1rem",display:"block",textDecoration:"none"}}>
              <strong>{p.name}</strong>
              <div style={{opacity:.7}}> Description </div>
            </motion.a>
          ))}
        </div>
      </section>
    </main>
  );
}
