import { getAllprojects } from "@/apis/projects/api.project";
import Card3dDemo from "@/components/ui/card-3d";
import { IProjects } from "@/types";

const ProjectPage = async () => {
  const projects = await getAllprojects();
  console.log(projects);
  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      {/* <h2 className="text-center text-4xl">All Projects</h2> */}
      <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project: IProjects) => (
          <Card3dDemo key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
