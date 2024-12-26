"use client";
export function BlurBackground() {
  return (
    <>
      <div
        className="absolute top-0 left-0 w-[1600px] h-[800px] bg-[radial-gradient(ellipse,rgba(0,161,255,0.6),transparent)]"
        style={{
          filter: "blur(200px)",
          transform: "translate(-50%, -20%)",
        }}></div>
      <div
        className="absolute top-0 left-[550px] w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(173,235,179,0.6),transparent)]"
        style={{
          filter: "blur(100px)",
          transform: "translate(-50%, -20%)",
        }}></div>
      <div
        className="absolute top-0 left-[1000px] w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(83,129,230,0.6),transparent)]"
        style={{
          filter: "blur(200px)",
          transform: "translate(-50%, -20%)",
        }}></div>

      <div
        className="absolute bottom-0 right-[-1600px] w-[1600px] h-[800px] bg-[radial-gradient(ellipse,rgba(0,161,255,0.6),transparent)]"
        style={{
          filter: "blur(200px)",
          transform: "translate(-50%, -20%)",
        }}></div>
      <div
        className="absolute bottom-0 right-[-550px] w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(173,235,179,0.6),transparent)]"
        style={{
          filter: "blur(100px)",
          transform: "translate(-50%, -20%)",
        }}></div>
      <div
        className="absolute bottom-0 right-[100px] w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(83,129,230,0.6),transparent)]"
        style={{
          filter: "blur(200px)",
          transform: "translate(-50%, -20%)",
        }}></div>
    </>
  );
}
