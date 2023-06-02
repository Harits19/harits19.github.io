class ProjectModel {
  final String image;
  final String name;
  final String description;
  final String link;
  final List<String> highlight;
  final String github;

  const ProjectModel({
    required this.image,
    required this.name,
    required this.description,
    required this.link,
    required this.highlight,
    this.github = ''
  });
}
