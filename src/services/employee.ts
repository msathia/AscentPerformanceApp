/**
 * Represents an employee in the organization.
 */
export interface Employee {
  /**
   * The unique identifier of the employee.
   */
  id: string;
  /**
   * The name of the employee.
   */
  name: string;
  /**
   * The employee's role (e.g., 'IC', 'Manager', 'Director', 'VP').
   */
  role: string;
  /**
   * The employee's level within their role (e.g., 'IC1', 'M2', 'D1').
   */
  level: string;
  /**
   * The ID of the employee's manager.
   */
  managerId: string | null;
}

const employees: Employee[] = [
  {
    id: "1",
    name: "Alice Johnson",
    role: "VP",
    level: "VP",
    managerId: null,
  },
  {
    id: "2",
    name: "Bob Williams",
    role: "Director",
    level: "D1",
    managerId: "1",
  },
  {
    id: "3",
    name: "Charlie Brown",
    role: "Manager",
    level: "M2",
    managerId: "2",
  },
  {
    id: "4",
    name: "Diana Miller",
    role: "IC",
    level: "IC4",
    managerId: "3",
  },
  {
    id: "5",
    name: "Eva Davis",
    role: "IC",
    level: "IC3",
    managerId: "3",
  },
];

/**
* Asynchronously retrieves an employee by their ID.
*
* @param employeeId The ID of the employee to retrieve.
* @returns A promise that resolves to an Employee object, or null if not found.
*/
export async function getEmployee(employeeId: string): Promise<Employee | null> {
  const employee = employees.find((e) => e.id === employeeId);
  return employee || null;
}

/**
 * Asynchronously retrieves all direct reports for a given manager ID.
 *
 * @param managerId The ID of the manager whose direct reports to retrieve. @returns A promise that resolves to an array of Employee objects.
 */
export async function getDirectReports(managerId: string): Promise<Employee[]> {
  const directReports = [
    {
      id: '789',
      name: 'Jane Smith',
      role: 'IC',
      level: 'IC3',
      managerId: managerId,
    }, 
    {
      id: '790',
      name: 'Smith Manager',
      role: 'Manager',
      level: 'M3',
      managerId: managerId,
    }, 
    {
      id: '791',
      name: 'Smith Director',
      role: 'Director',
      level: 'D1',
      managerId: managerId,
    }, 
    {
      id: '792',
      name: 'Smith VP',
      role: 'VP',
      level: 'VP',
      managerId: managerId,
    },
  ];
  // Ensure all employees have managerId as string or null
  return directReports.map(report => ({ ...report, managerId: report.managerId === null ? null : String(report.managerId) }));
}

