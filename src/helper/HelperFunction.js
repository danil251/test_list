export const rolVersions = {
  driver: 'Водитель',
  cook: 'Повар',
  waiter: 'Официант',
};

export const roleConversion = (role) => {
  return rolVersions[role];
};

export const roleFilters = () => {
  const arr = []
  for (const item in rolVersions) {
    arr.push({text: rolVersions[item], value: item, label: rolVersions[item]})
  }
  return arr
}

