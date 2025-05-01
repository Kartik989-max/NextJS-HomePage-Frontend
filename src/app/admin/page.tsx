// "use client";
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   useSortable,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";

// import { CSS } from "@dnd-kit/utilities";
// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// interface Section {
//   _id: string;
//   type: string;
//   content: string;
//   order: number;
// }

// export default function AdminPage() {
//   const [sections, setSections] = useState<Section[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await fetch("http://localhost:5000/api/sections");
//         const data = await res.json();
//         setSections(data);
//         console.log("Fetched sections:", data);
//       } catch (error) {
//         console.error("Failed to fetch sections:", error);
//       }
//     }
//     fetchData();
//   }, []);

//   async function handleSave() {
//     setLoading(true);
//     try {
//       for (const section of sections) {
//         const res = await fetch(`http://localhost:5000/api/sections/${section._id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(section),
//         });
//         if (!res.ok) {
//           throw new Error(`Failed to update section with id ${section._id}`);
//         }
//       }
//       alert("All changes saved successfully!");
//     } catch (error) {
//       console.error(error);
//       alert("Error occurred while saving.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
    
//     <>
//       <div className="flex flex-col items-center justify-center min-h-screen py-2">
//         <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
//         {sections.map((section) => (
//           <div key={section._id} className="mb-4 w-full max-w-md">
//             <Input
//               value={section.content}
//               onChange={(e) => {
//                 const newSections = sections.map((s) =>
//                   s._id === section._id ? { ...s, content: e.target.value } : s
//                 );
//                 setSections(newSections);
//               }}
//             />
//             <Input
//               value={section.type}
//               onChange={(e) => {
//                 const newSections = sections.map((s) =>
//                   s._id === section._id ? { ...s, content: e.target.value } : s
//                 );
//                 setSections(newSections);
//               }}
//             />
//           </div>
//         ))}
//         <Button onClick={handleSave} disabled={loading}>
//           {loading ? "Saving..." : "Save Changes"}
//         </Button>
//       </div>
//     </>
//   );
// }



"use client";

import { GripVertical } from "lucide-react"; 
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
interface Section {
  _id: string;
  type: string;
  title: string;
  content: string;
  order: number;
}


function SortableItem({
  section,
  onChange,
}: {
  section: Section;
  onChange: (updated: Section) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: section._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="overflow-hidden w-full max-w-2xl p-6 mb-6 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-md"
    
    >
       <div
        ref={setActivatorNodeRef}
        {...listeners}
        {...attributes}
        className="cursor-grab text-gray-400 hover:text-black dark:hover:text-white mb-2 flex justify-end"
      >
        <GripVertical className="h-5 w-5" />
      </div>
      <h1>{section.type}</h1>
    <label className="">Title</label>
      <Input
        value={section.title}
        placeholder="Title"
        onChange={(e) => onChange({ ...section, title: e.target.value })}
      />
      <label className="">Content</label>
      <Input
        className="mb-2"
        value={section.content}
        placeholder="Content"
        onChange={(e) => onChange({ ...section, content: e.target.value })}
      />
      
    </div>
  );
}

export default function AdminPage() {
  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (!token) {
      window.location.href = "/admin-login";
    }
  }, []);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sections`);
        const data = await res.json();
        const sorted = data.sort((a: Section, b: Section) => a.order - b.order);
        setSections(sorted);
        console.log("Fetched sections:", sorted);
      } catch (error) {
        console.error("Failed to fetch sections:", error);
      }
    }
    fetchData();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: import("@dnd-kit/core").DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s._id === active.id);
      const newIndex = sections.findIndex((s) => s._id === over.id);
      const reordered = arrayMove(sections, oldIndex, newIndex).map((section, idx) => ({
        ...section,
        order: idx,
      }));
      setSections(reordered);
    }
  };

  async function handleSave() {
    setLoading(true);
    try {
      for (const section of sections) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sections/${section._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(section),
        });
        if (!res.ok) {
          throw new Error(`Failed to update section with id ${section._id}`);
        }
      }
      alert("All changes saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Error occurred while saving.");
    } finally {
      setLoading(false);
    }
  }

  const updateSection = (updatedSection: Section) => {
    setSections((prev) =>
      prev.map((s) => (s._id === updatedSection._id ? updatedSection : s))
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-6">Admin Page</h1>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sections.map((s) => s._id)} strategy={verticalListSortingStrategy}>
          {sections.map((section) => (
            <SortableItem
              key={section._id}
              section={section}
              onChange={updateSection}
            />
          ))}
        </SortableContext>
      </DndContext>

      <Button onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}
