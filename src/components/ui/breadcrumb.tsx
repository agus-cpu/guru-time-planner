
import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="mb-4">
      <ol className="flex text-sm">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="mx-2 text-gray-500">/</span>}
            <li>
              {item.href ? (
                <Link 
                  to={item.href} 
                  className={`hover:underline ${index === items.length - 1 ? 'text-gray-600' : 'text-blue-600'}`}
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-600">{item.label}</span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
