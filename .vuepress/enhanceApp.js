function findVersionedPaths(paths) {
  return Object.entries(paths).map(([path, children]) => {
    return children
      .filter(child => Array.isArray(child.versions))
      .map(child => ({ ...child, path: pathJoin(path, child.path) }));
  }).flat();
}

// https://stackoverflow.com/a/29855282/4430124
function pathJoin(...parts) {
  var separator = '/';
  var replace = new RegExp(separator + '{1,}', 'g');
  return parts.join(separator).replace(replace, separator);
}
