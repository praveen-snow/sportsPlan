export function getDiagram(goObj,refElement){
  let diagram = goObj(go.Diagram,refElement,{
    initialContentAlignment: go.Spot.Center
  });
  return diagram;
}
