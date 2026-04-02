"use server";

import axios from "axios";
import { httpClient } from "@/lib/axios/httpClient";
import { getCookie } from "@/lib/cookieUtils";

const isCanceledError = (error: unknown) => {
  if (axios.isCancel(error)) return true;
  if (typeof error === "object" && error !== null) {
    const maybe = error as { code?: string; name?: string; message?: string };
    if (maybe.code === "ERR_CANCELED") return true;
    if (maybe.name === "CanceledError" || maybe.name === "AbortError") return true;
    if (typeof maybe.message === "string" && maybe.message.toLowerCase().includes("canceled")) {
      return true;
    }
  }
  return false;
};

export const createPlaylist = async (payload: { name: string; description: string }) => {
  try {
    const token = await getCookie("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await httpClient.post("/playlist", payload, { headers });
    return response;
  } catch (error) {
    if (isCanceledError(error)) return null;
    let message = "Failed to create playlist";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.error?.message || error.message || message;
    }
    console.error("Failed to create playlist:", message);
    return { error: true, message };
  }
};

export const getPlaylists = async () => {
  try {
    const token = await getCookie("token");
    if (!token) return { data: [] };
    
    const headers: Record<string, string> = {
      cookie: `token=${token}`,
      Authorization: `Bearer ${token}`,
    };
    const response = await httpClient.get("/playlist", { headers });
    return response;
  } catch (error) {
    if (isCanceledError(error)) return { data: [] };
    console.error("Failed to fetch playlists:", error);
    return { data: [] };
  }
};

export const getPlaylistDetails = async (id: string) => {
  try {
    const token = await getCookie("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await httpClient.get(`/playlist/${id}`, { headers });
    return response;
  } catch (error: unknown) {
    if (isCanceledError(error)) return null;
    let status = 500;
    let message = "Failed to load playlist";
    if (axios.isAxiosError(error)) {
      status = error.response?.status || 500;
      message = error.response?.data?.error?.message || error.message || message;
    }
    console.error(`Failed to fetch playlist ${id}:`, message);
    return { error: true, status, message };
  }
};

export const addProblemToPlaylist = async (playlistId: string, problemsId: string[]) => {
  try {
    const token = await getCookie("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await httpClient.post(`/playlist/${playlistId}/add-problem`, { problemsId }, { headers });
    return response;
  } catch (error) {
    if (isCanceledError(error)) return null;
    let message = "Failed to add problem to playlist";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.error?.message || error.message || message;
    }
    console.error("Failed to add problem to playlist:", message);
    return { error: true, message };
  }
};

export const removeProblemFromPlaylist = async (playlistId: string, problemId: string) => {
  try {
    const token = await getCookie("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await httpClient.delete(`/playlist/${playlistId}/remove-problem`, {
      headers,
      data: { problemsId: [problemId] }
    });
    return response;
  } catch (error) {
    if (isCanceledError(error)) return null;
    let message = "Failed to remove problem from playlist";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.error?.message || error.message || message;
    }
    console.error("Failed to remove problem from playlist:", message);
    return { error: true, message };
  }
};

export const deletePlaylist = async (id: string) => {
  try {
    const token = await getCookie("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await httpClient.delete(`/playlist/${id}`, { headers });
    return response;
  } catch (error) {
    if (isCanceledError(error)) return null;
    let message = "Failed to delete playlist";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.error?.message || error.message || message;
    }
    console.error("Failed to delete playlist:", message);
    return { error: true, message };
  }
};
