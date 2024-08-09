const GRID_CLASSES: { [key: number]: string } = {
  0: 'hidden',
  1: 'grid-cols-1',
  2: 'grid-rows-2',
  3: 'custom-grid',
  4: 'grid-cols-2',
};

export function getGridCols(imageCount: number): string {
  return GRID_CLASSES[imageCount] || 'grid-cols-2';
}
