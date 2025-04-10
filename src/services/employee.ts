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

/**
 * Asynchronously retrieves an employee by their ID.
 *
 * @param employeeId The ID of the employee to retrieve.
 * @returns A promise that resolves to an Employee object, or null if not found.
 */
export async function getEmployee(employeeId: string): Promise<Employee | null> {
  // TODO: Implement this by calling an API.

  return {
    id: employeeId,
    name: 'John Doe',
    role: 'IC',
    level: 'IC5',
    managerId: '456',
  };
}

/**
 * Asynchronously retrieves all direct reports for a given manager ID.
 *
 * @param managerId The ID of the manager whose direct reports to retrieve.
 * @returns A promise that resolves to an array of Employee objects.
 */
export async function getDirectReports(managerId: string): Promise<Employee[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      id: '789',
      name: 'Jane Smith',
      role: 'IC',
      level: 'IC3',
      managerId: managerId,
    },
  ];
}
