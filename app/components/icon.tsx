export const Icon = ({ id,className }:{id: string; className: string;}) => {
  return (
    <i className={`${id} ${className}`}></i>
  );
};