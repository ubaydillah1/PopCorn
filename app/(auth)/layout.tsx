import { FallingStars } from "@/components/FallingStars";

const Layour = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <FallingStars />
      {children}
    </div>
  );
};

export default Layour;
