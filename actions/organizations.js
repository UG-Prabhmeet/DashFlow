"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getOrganization(slug) {
  // Await the auth() to get the current user's userId
  const { userId } = await auth(); // **await** auth() to get userId
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Retrieve the user from the database
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Get the organization details using clerkClient
  const client = await clerkClient(); // **await** clerkClient() to get the client instance
  const organization = await client.organizations.getOrganization({
    slug,
  });

  if (!organization) {
    return null;
  }

  // Check if the user belongs to this organization
  const { data: membership } = await client.organizations.getOrganizationMembershipList({
    organizationId: organization.id,
  });

  const userMembership = membership.find(
    (member) => member.publicUserData.userId === userId
  );

  // If user is not a member, return null
  if (!userMembership) {
    return null;
  }

  return organization;
}

export async function getProjects(orgId) {
  // Await the auth() to get the current user's userId
  const { userId } = await auth(); // **await** auth() to get userId
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Retrieve the user from the database
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Get projects related to the organization
  const projects = await db.project.findMany({
    where: { organizationId: orgId },
    orderBy: { createdAt: "desc" },
  });

  return projects;
}

export async function getUserIssues(userId) {
  // Await the auth() to get the current user's orgId
  const { orgId } = await auth(); // **await** auth() to get orgId

  if (!userId || !orgId) {
    throw new Error("No user id or organization id found");
  }

  // Retrieve the user from the database
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Get issues related to the user and organization
  const issues = await db.issue.findMany({
    where: {
      OR: [{ assigneeId: user.id }, { reporterId: user.id }],
      project: {
        organizationId: orgId,
      },
    },
    include: {
      project: true,
      assignee: true,
      reporter: true,
    },
    orderBy: { updatedAt: "desc" },
  });

  return issues;
}

export async function getOrganizationUsers(orgId) {
  // Await the auth() to get the current user's userId
  const { userId } = await auth(); // **await** auth() to get userId
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Retrieve the user from the database
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Get organization memberships using clerkClient
  const client = await clerkClient(); // **await** clerkClient() to get the client instance
  const organizationMemberships = await client.organizations.getOrganizationMembershipList({
    organizationId: orgId,
  });

  // Get the userIds of the members of the organization
  const userIds = organizationMemberships.data.map(
    (membership) => membership.publicUserData.userId
  );

  // Retrieve the users from the database
  const users = await db.user.findMany({
    where: {
      clerkUserId: {
        in: userIds,
      },
    },
  });

  return users;
}
