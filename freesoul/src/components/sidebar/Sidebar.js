import React from 'react';
import Logo from './FreeSoulLogoweb-01.png';
import Photo from'./profilepic.png';

export default function Sidebar(){

	const user = localStorage.getItem("USERNAME");

	return(

		<aside className="main-sidebar sidebar-dark-primary elevation-4">
			
			<a href="#/" className="brand-link text-decoration-none">
				
				<img 
					src={Logo}
					alt="AdminLTE Logo"
					className="brand-image img-circle elevation-3"
				/>

				<span className="brand-text font-weight-light">FreeSoul</span>

			</a>

			<div className="sidebar">
				
				<div className="user-panel mt-3 pb-3 mb-3 d-flex">
					
					<div className="image">
						
						<img
							className="img-circle elevation-2"
							alt="user"
							src={Photo}
						/>

					</div>

					<div className="info">
						<a href="#/" className="d-block text-decoration-none">
							{user}		
						</a>
					</div>

				</div>

				<nav className="mt-2">
					
					<ul 
						className="nav nav-pills nav-sidebar flex-column"
						data-widget="treeview"
						role="menu"
						data-accordion="false">

						<li className="nav-item">
							<a href="/admins" className="nav-link">
								<i className="nav-icon fas fa-user-cog"></i>
								<p>Administradores</p>
							</a>
						</li>

						<li className="nav-item">
							<a href="/slide" className="nav-link">
								<i className="nav-icon fas fa-sliders-h"></i>
								<p>Gestor Carousel</p>
							</a>
						</li>

						<li className="nav-item">
							<a href="/pictures" className="nav-link">
								<i className="nav-icon fas fa-images"></i>
								<p>Gestor de Imagenes</p>
							</a>
						</li>

						<li className="nav-item">
							<a href="/" className="nav-link">
								<i className="nav-icon fas fa-tshirt"></i>
								<p>Gestor de Inventario</p>
							</a>
						</li>

						<li className="nav-item">
							<a href="/users" className="nav-link">
								<i className="nav-icon fas fa-users"></i>
								<p>Usuarios</p>
							</a>
						</li>
					</ul>

				</nav>

			</div>

		</aside>

	);

}