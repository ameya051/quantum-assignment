import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings, X } from "lucide-react";

const userData = [
  {
    id: 1,
    name: "Michael Holz",
    avatar: "/demo.jpg",
    dateCreated: "04/10/2013",
    role: "Admin",
    status: "Active",
    statusColor: "text-green-500"
  },
  {
    id: 2,
    name: "Paula Wilson",
    avatar: "/demo.jpg",
    dateCreated: "05/08/2014",
    role: "Publisher",
    status: "Active",
    statusColor: "text-green-500"
  },
  {
    id: 3,
    name: "Antonio Moreno",
    avatar: "/demo.jpg",
    dateCreated: "11/05/2015",
    role: "Publisher",
    status: "Suspended",
    statusColor: "text-red-500"
  },
  {
    id: 4,
    name: "Mary Saveley",
    avatar: "/demo.jpg",
    dateCreated: "06/09/2016",
    role: "Reviewer",
    status: "Active",
    statusColor: "text-green-500"
  },
  {
    id: 5,
    name: "Martin Sommer",
    avatar: "/demo.jpg",
    dateCreated: "12/08/2017",
    role: "Moderator",
    status: "Inactive",
    statusColor: "text-orange-500"
  }
];

export function UsersTable() {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200">
            <TableHead className="w-12 text-gray-500 font-medium">#</TableHead>
            <TableHead className="text-gray-500 font-medium">Name</TableHead>
            <TableHead className="text-gray-500 font-medium">Date Created</TableHead>
            <TableHead className="text-gray-500 font-medium">Role</TableHead>
            <TableHead className="text-gray-500 font-medium">Status</TableHead>
            <TableHead className="text-gray-500 font-medium">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.map((user) => (
            <TableRow key={user.id} className="border-b border-gray-100 hover:bg-gray-50/50">
              <TableCell className="text-gray-500 font-medium">{user.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <span className="text-blue-600 font-medium">{user.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-gray-500">{user.dateCreated}</TableCell>
              <TableCell className="text-gray-500">{user.role}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    user.status === 'Active' ? 'bg-green-500' :
                    user.status === 'Suspended' ? 'bg-red-500' : 'bg-orange-500'
                  }`} />
                  <span className={user.statusColor}>{user.status}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}